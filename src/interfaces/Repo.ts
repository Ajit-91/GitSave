export default interface Repo {
    id: string | number,
    name: string,
    html_url: string,
    description: string | null,
    created_at: string,
    open_issues: number,
    watchers: number,
    owner: {
        id: string | number,
        avatar_url: string,
        html_url: string,
        type: string,
        site_admin: boolean
    }    
}