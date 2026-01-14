import db from '../config/db.js'
export async function showAllMembersInProject(req, res){
    //procedure
    //get projectid
    //use project id to gell all members that belong to that project
    const projectId = req.params.projectId
    //projectId cannot be trusted, make sure that the user is part of the project
    try {
        const [projectResult] = await db.execute("select distinct person_id, role_id from project_person_role where project_id = ?", [projectId])
        return res.status(200).json(projectResult)
    } catch (error) {
        return res.status(500).json({errorMessage: "enable to fetch members"})
    }
}




