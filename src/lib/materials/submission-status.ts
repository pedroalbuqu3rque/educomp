/** Dados compartilhados entre a página de envios (servidor) e os componentes (cliente). */
export interface SentMaterial {
 id: string;
 title: string;
 created_at: string;
 review_status: "pending" | "in_review" | "approved" | "rejected" | "changes_requested";
 is_published: boolean;
 type: string;
 grade: string;
 reason: string | null;
 resubmission_of: string | null;
 revision_id: string | null;
}

export const statusLabels: Record<SentMaterial["review_status"], string> = {
 pending: "Aguardando revisão",
 in_review: "Em análise",
 approved: "Aprovado",
 rejected: "Recusado",
 changes_requested: "Ajustes solicitados",
};
