export type CommunityKind = "discussion" | "application_report";
export type CommunityFilter = "all" | "discussion" | "application_report";
export interface CommunityComment {
 id: string;
 authorId: string;
 authorName: string;
 authorOccupation: string;
 authorAvatar: string|null;
 parentId: string | null;
 kind: CommunityKind;
 body: string;
 grade: string | null;
 adaptations: string | null;
 createdAt: string;
 updatedAt: string;
 replies: CommunityComment[];
}
export interface CommunityPageData {
 items: CommunityComment[];
 total: number;
 page: number;
 pages: number;
 viewerId: string | null;
 error?: string;
}
