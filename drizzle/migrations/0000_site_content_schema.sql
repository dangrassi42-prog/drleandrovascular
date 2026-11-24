
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Admin allowlist (by e-mail), only readable by service role
CREATE TABLE public.admin_allowlist (
  email text PRIMARY KEY
);
GRANT ALL ON public.admin_allowlist TO service_role;
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.grant_admin_from_allowlist()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.admin_allowlist a WHERE lower(a.email) = lower(NEW.email)) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_admin_grant
AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_from_allowlist();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Site content (key/value)
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_touch BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'activity',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Locations
CREATE TABLE public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL DEFAULT '',
  schedule text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  maps_url text NOT NULL DEFAULT '',
  logo_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.locations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.locations TO authenticated;
GRANT ALL ON public.locations TO service_role;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read locations" ON public.locations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write locations" ON public.locations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- FAQs
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write faqs" ON public.faqs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5,
  published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact submissions
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT, INSERT, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) BETWEEN 2 AND 100 AND char_length(phone) BETWEEN 8 AND 25 AND char_length(reason) BETWEEN 2 AND 1000);
CREATE POLICY "Admins read submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed content
INSERT INTO public.site_content (key, value) VALUES
('doctor_name', 'Dr. Leandro Fernandes'),
('specialty', 'Angiologia, Cirurgia Vascular e Endovascular'),
('crm', 'CRM/BA 27444'),
('rqe', 'RQE 22658 · RQE 22675'),
('city', 'Irecê – Bahia'),
('whatsapp_number', '5574999331012'),
('whatsapp_message', 'Olá! Gostaria de agendar uma consulta com o Dr. Leandro Fernandes.'),
('instagram', 'drleandro.vascular'),
('hero_title', 'Cuidado especializado para a saúde vascular das suas pernas.'),
('hero_subtitle', 'Atendimento humanizado, avaliação especializada e tratamentos vasculares individualizados, com foco no bem-estar e na qualidade de vida.'),
('hero_image_url', ''),
('about_title', 'Medicina vascular com escuta, cuidado e precisão.'),
('about_text', 'O Dr. Leandro Fernandes é médico angiologista e cirurgião vascular, com atuação em cirurgia vascular e endovascular em Irecê e região.

Seu trabalho é guiado pelo atendimento humanizado: cada paciente é ouvido com atenção, avaliado de forma criteriosa e acompanhado com um plano de cuidado individualizado.

O compromisso é com a saúde vascular e a qualidade de vida de quem procura o consultório — com informação clara, respeito e responsabilidade em cada etapa.'),
('about_image_url', ''),
('varizes_title', 'Cuide da saúde das suas pernas.'),
('varizes_text', 'Conheça as possibilidades de avaliação e tratamento das varizes, com uma abordagem individualizada para cada paciente.'),
('varizes_image_url', ''),
('contact_intro', 'Agende sua consulta pelo WhatsApp ou envie uma mensagem. Retornamos assim que possível.');

INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Tratamento de varizes', 'Avaliação das veias das pernas e indicação do tratamento mais adequado para cada caso, de forma individualizada.', 'sparkles', 1),
('Avaliação de doenças vasculares', 'Consulta especializada para investigar sintomas relacionados às artérias, veias e circulação.', 'stethoscope', 2),
('Cirurgia vascular', 'Procedimentos cirúrgicos indicados após avaliação criteriosa, com planejamento e acompanhamento.', 'scissors', 3),
('Procedimentos endovasculares', 'Técnicas realizadas por dentro dos vasos sanguíneos, quando indicadas pela avaliação médica.', 'activity', 4),
('Avaliação da circulação arterial', 'Investigação de sinais de má circulação, como dor ao caminhar, pés frios ou alterações na pele.', 'heart-pulse', 5),
('Cuidados com a saúde vascular', 'Orientações de prevenção e hábitos que contribuem para a saúde das veias e artérias.', 'shield-check', 6),
('Orientação e acompanhamento vascular', 'Seguimento contínuo para acompanhar a evolução do quadro e ajustar o cuidado quando necessário.', 'clipboard-list', 7);

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('Quando devo procurar um cirurgião vascular?', 'É indicado procurar o especialista ao perceber sinais como veias dilatadas, inchaço nas pernas, sensação de peso, dor ao caminhar, feridas que demoram a cicatrizar ou alterações na cor da pele. A avaliação também é recomendada para quem tem histórico familiar de doenças vasculares.', 1),
('O que são varizes?', 'Varizes são veias dilatadas e tortuosas, geralmente nas pernas, que surgem quando o retorno do sangue ao coração fica prejudicado. Podem causar desconforto, peso, cansaço e inchaço, além da questão estética. Somente a avaliação médica define a melhor conduta para cada caso.', 2),
('Quais são os sinais de problemas na circulação?', 'Alguns sinais comuns são dor nas pernas ao caminhar, pés frios, formigamento, inchaço, cãibras, mudanças na cor da pele e feridas de difícil cicatrização. Esses sintomas não definem um diagnóstico sozinhos, mas merecem avaliação especializada.', 3),
('Como funciona a avaliação vascular?', 'A consulta inclui conversa sobre sintomas e histórico, exame físico das pernas e da circulação e, quando necessário, solicitação de exames complementares. Com essas informações, o médico orienta o paciente sobre o cuidado mais adequado.', 4),
('Como posso agendar uma consulta?', 'O agendamento pode ser feito pelo WhatsApp, pelo botão disponível em todo o site, ou pelo formulário de contato. A equipe retorna com as opções de dia, horário e local.', 5),
('Onde o Dr. Leandro realiza atendimentos?', 'O Dr. Leandro atende em Irecê – Bahia, na Imagem Diagnóstico, Clínica Alfa Medicina Integrada, Clínica Mãe e Centro de Diagnóstico Médico (CDM). Consulte a página de locais para endereços e horários.', 6);

INSERT INTO public.locations (name, sort_order) VALUES
('Imagem Diagnóstico', 1),
('Clínica Alfa Medicina Integrada', 2),
('Clínica Mãe', 3),
('Centro de Diagnóstico Médico (CDM)', 4);
