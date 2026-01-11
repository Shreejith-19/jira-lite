import db from '../config/db.js'
export async function createNewIssue(req, res){
    //procedure:
    /**
     1. get the info from the req.body
     2. check the following:
        a. if type = epic then no parent is allowed
        b. if type = story then parent is optional
        c. if type = task then story must be a parent
    3. add info to db
     **/
    const projectId = req.params.projectId 
    const creatorId = req.user.personId
    console.log(projectId)
    console.log(creatorId)
    const {title, description, issueType, parentId, priority, assignee} = req.body
    //for optinal fields
    // ?? - nullish operator if undefined use this instead 
    const parentIssueId = parentId ?? null
    const assigneeId = assignee ?? null
    try {
        await db.execute("insert into issue(project_id, title, description, issue_type, parent_issue_id, priority, assignee_id, created_by) values(?, ?, ?, ?, ?, ?, ?, ?)", [projectId, title, description, issueType, parentIssueId, priority, assigneeId, creatorId])
        return res.status(201).json({message: "new issue created"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({errorMessage: "Failed to save issue"})
    }
}

export async function getAllBasicIssueDetails(req, res){

}

export async function getIssueDetailsById(req, res){

}

export async function editIssueById(req, res){
    // must handle change in parent 
}

export async function deleteIssueById(req, res){

}