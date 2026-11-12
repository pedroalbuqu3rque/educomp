import Link from "next/link";

export type LegalKind = "termos" | "privacidade";
type Section = { id: string; menu: string; title: string; paragraphs: string[] };

type LegalDocument = { title: string; description: string; sections: Section[] };
const documents: Record<LegalKind, LegalDocument> = {
  termos: {
    title: "Termos de uso",
    description: "Condições para consultar, utilizar e compartilhar recursos pedagógicos no EduComp.",
    sections: [
      { id: "finalidade", menu: "Uso da plataforma", title: "Finalidade e uso", paragraphs: [
        "O EduComp é uma plataforma de compartilhamento de materiais pedagógicos de Computação para apoiar docentes da Educação Básica. A Biblioteca pode ser consultada sem cadastro; salvar materiais, publicar contribuições e participar das discussões exige uma conta.",
        "Ao utilizar os recursos, comprometa-se a agir de forma respeitosa e a observar a legislação aplicável. O acesso à plataforma não assegura a disponibilidade ininterrupta de todos os serviços.",
      ] },
      { id: "conta", menu: "Conta e acesso", title: "Cadastro e responsabilidade", paragraphs: [
        "Para criar uma conta, forneça dados corretos e mantenha suas credenciais protegidas. Você é responsável pelo uso realizado com suas credenciais e deve comunicar pelo canal de contato qualquer suspeita de uso indevido.",
        "Perfis públicos podem exibir informações de identificação, foto de perfil opcional e autoria dos materiais, além de outras informações profissionais que você optar por disponibilizar.",
      ] },
      { id: "autoria", menu: "Autoria", title: "Materiais e direitos autorais", paragraphs: [
        "Ao enviar um material, você declara ser titular dos direitos necessários ou ter autorização para compartilhá-lo. Informe a autoria e a fonte quando cabível e não publique arquivos que violem direitos de terceiros.",
        "O compartilhamento no EduComp não transfere automaticamente os direitos autorais ao público. O uso e a redistribuição de cada recurso devem respeitar suas permissões, a legislação e as indicações do autor. Não envie nomes, imagens ou outros dados pessoais de estudantes sem base legal e autorização apropriadas.",
      ] },
      { id: "revisao", menu: "Publicação", title: "Envio, revisão e publicação", paragraphs: [
        "Os materiais enviados passam por revisão editorial. Um recurso aprovado não é necessariamente publicado de imediato; a publicação é uma etapa separada. O autor pode acompanhar a situação em Meus envios.",
        "A equipe de revisão pode solicitar ajustes, recusar materiais ou retirar conteúdos do acervo quando houver problemas de autoria, segurança, qualidade ou adequação. Pedidos de ajustes e recusas precisam de justificativa. O autor pode enviar uma nova versão, preservando o histórico da anterior.",
      ] },
      { id: "comunidade", menu: "Responsabilidades", title: "Comunidade e uso responsável", paragraphs: [
        "Discussões e relatos devem contribuir para trocas profissionais sobre os materiais. Não publique spam, ofensas, assédio, informações pessoais de estudantes ou conteúdo alheio ao objetivo da plataforma.",
        "Comentários podem ser denunciados e analisados por revisores. A denúncia não oculta automaticamente o conteúdo. Cada professor também deve avaliar a pertinência e a adequação pedagógica dos recursos antes de aplicá-los em sala de aula.",
      ] },
      { id: "contato", menu: "Contato", title: "Dúvidas e solicitações", paragraphs: [
        "Questões sobre acesso, direitos autorais, participação e uso da plataforma podem ser encaminhadas pela página Fale conosco. O contato permite registrar a solicitação, mas ainda não constitui canal com prazo de resposta garantido.",
        "Estas condições são uma proposta para o MVP e devem passar por validação jurídica e institucional antes de uma abertura pública. Mudanças relevantes precisam ser comunicadas de forma transparente.",
      ] },
    ],
  },
  privacidade: {
    title: "Privacidade",
    description: "Entenda quais dados fazem parte do EduComp e como são utilizados na plataforma.",
    sections: [
      { id: "dados", menu: "Cadastro", title: "Informações coletadas", paragraphs: [
        "O cadastro e a autenticação utilizam nome, e-mail e dados necessários para acesso à conta. O perfil pode conter informações profissionais adicionais e foto de perfil opcional. Também são registrados materiais e arquivos enviados, classificações pedagógicas, materiais salvos, interações na Comunidade e notificações.",
        "O formulário Fale conosco registra nome, e-mail, assunto e mensagem, além do identificador da conta quando a pessoa está autenticada. Evite enviar dados sensíveis ou informações pessoais de estudantes.",
      ] },
      { id: "finalidades", menu: "Uso de dados", title: "Para que usamos os dados", paragraphs: [
        "Os dados servem para autenticar usuários, apresentar perfis e autoria, organizar a Biblioteca, permitir o envio e a revisão de materiais, manter a Comunidade e disponibilizar notificações relacionadas às contribuições.",
        "Mensagens de contato são armazenadas para análise pela equipe responsável pelo projeto. O código atual não envia e-mails automáticos de resposta nem notificações push; os avisos são internos à plataforma.",
      ] },
      { id: "publicacao", menu: "Contribuições", title: "O que pode ficar público", paragraphs: [
        "Materiais publicados, informações pedagógicas, autoria, foto de perfil escolhida e conteúdos visíveis da Comunidade podem ser acessados por visitantes. Materiais ainda em análise e seus arquivos ficam restritos até a publicação, conforme as regras de acesso implementadas.",
        "Informações compartilhadas voluntariamente em comentários e relatos podem ficar visíveis a outras pessoas. Não publique dados pessoais de crianças e adolescentes ou de terceiros sem autorização e fundamento adequado.",
      ] },
      { id: "seguranca", menu: "Proteção", title: "Armazenamento e segurança", paragraphs: [
        "O projeto utiliza Supabase para autenticação, banco de dados e armazenamento de arquivos, com controles de acesso por conta e permissões de revisão. A foto de perfil é armazenada em um bucket público para exibição em perfis e discussões; evite incluir informações pessoais na imagem e seus metadados. Cookies técnicos podem ser usados para manter a sessão autenticada. Não há ferramenta de publicidade direcionada implementada neste repositório.",
        "A hospedagem definitiva, os fluxos de transferência internacional, os prazos de retenção e a rotina de eliminação ainda precisam de definição e documentação antes do lançamento. Nenhuma plataforma pode garantir risco zero; acessos indevidos devem ser comunicados pelo canal de contato.",
      ] },
      { id: "direitos", menu: "Direitos", title: "Seus direitos sobre os dados", paragraphs: [
        "Nos termos da Lei Geral de Proteção de Dados Pessoais (LGPD), você pode solicitar, conforme aplicável, confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação e informações sobre compartilhamento de seus dados.",
        "Para encaminhar uma solicitação, utilize Fale conosco e indique que o assunto é privacidade. A análise poderá exigir confirmação de identidade para evitar acesso indevido a dados de outras pessoas. Algumas informações podem precisar ser conservadas por obrigação legal.",
      ] },
      { id: "transparencia", menu: "Atualizações", title: "Transparência e contato", paragraphs: [
        "O EduComp é apresentado atualmente como projeto de portfólio. A identificação formal do controlador, o canal definitivo de privacidade, as bases legais de cada tratamento e os prazos de conservação deverão ser estabelecidos antes da operação pública.",
        "Esta versão descreve as funcionalidades atuais do código e será revista caso a arquitetura, o serviço ou as formas de tratamento de dados sejam alterados.",
      ] },
    ],
  },
};

export function LegalContent({ kind }: { kind: LegalKind }) {
  const document = documents[kind];
  return <main className="institutional-main institutional-legal" id="conteudo">
    <div className="institutional-heading">
      <p className="institutional-eyebrow">DOCUMENTAÇÃO</p>
      <h1>{document.title}</h1>
      <p>{document.description}</p>
    </div>
    <div className="institutional-legal-notice" role="note"><strong>DOCUMENTO EM REVISÃO</strong><p>Este texto reflete o estágio atual do projeto. Identificação do responsável, procedimentos operacionais e validação jurídica devem ser confirmados antes da publicação ao público.</p></div>
    <div className="institutional-legal-grid">
      <nav className="institutional-legal-nav" aria-label={`Seções de ${document.title}`}>
        <strong>NESTA PÁGINA</strong>
        <ol>{document.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index+1).padStart(2,"0")}</span>{section.menu}</a></li>)}</ol>
      </nav>
      <article className="institutional-legal-article">
        {document.sections.map((section, index) => <section id={section.id} key={section.id} className="institutional-legal-section">
          <h2><span>{String(index+1).padStart(2,"0")}</span> {section.title}</h2>
          {section.paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
          {section.id === "contato" && <p><Link className="institutional-text-link" href="/contato">Acessar Fale conosco</Link></p>}
          {section.id === "direitos" && <p><Link className="institutional-text-link" href="/contato">Solicitar informações sobre meus dados</Link></p>}
        </section>)}
      </article>
    </div>
    <div className="institutional-bottom"><Link className="button button-outline" href="/">Voltar ao início</Link><span>Versão de trabalho · 11 de novembro de 2026</span></div>
  </main>;
}
