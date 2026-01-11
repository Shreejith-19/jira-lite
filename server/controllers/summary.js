import db from '../config/db.js'
export async function showAllMembersInProject(req, res){
    //procedure
    //get projectid
    //use project id to gell all members that belong to that project
    const projectId = req.params.projectId
    try {
        const [projectResult] = await db.execute("select distinct person_id, role_id from project_person_role where project_id = ?", [projectId])
        return res.status(200).json(projectResult)
    } catch (error) {
        return res.status(500).json({errorMessage: "enable to fetch members"})
    }
}

export async function showAllIssuesByTypeInProject(req, res){
    //must return epicid
    const projectId = req.params.projectId
    const issueType = req.params.issueType
    try {
        const [issues] = await db.execute("select issue_id from issue where project_id = ? and issue_type = ? ", [projectId, issueType])
        return res.status(200).json(issues)
    } catch (error) {
        return res.status(500).json({errorMessage: "enable to fetch epics"})
    }
}


