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
    const {title, description, issueType, parentId, priority, assignee} = req.body
    //for optinal fields
    // ?? - nullish operator if undefined use this instead 
    const parentIssueId = parentId ?? null // if-else cannot be used incase projectId is zero
    const assigneeId = assignee ?? null

    //Task: validate child-parent relation before write

    try {
        await db.execute("insert into issue(project_id, title, description, issue_type, parent_issue_id, priority, assignee_id, created_by) values(?, ?, ?, ?, ?, ?, ?, ?)", [projectId, title, description, issueType, parentIssueId, priority, assigneeId, creatorId])
        return res.status(201).json({message: "new issue created"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({errorMessage: "Failed to save issue"})
    }
}

export async function showAllParentIssues(req, res){
    const {projectId} = req.params
    const {childType} = req.query
    const childToParentMap = {
        STORY: "EPIC",
        TASK: "STORY"
    }
    const parentType = childToParentMap[childType]
    if(!parentType){
        return res.status(400).json({errorMessage: "Invalid child or No parent type"})
    }
    try {
        const [parents] = await db.execute("select issue_id, title from issue where project_id = ? and issue_type = ?", [projectId, parentType])
        if (parents.length === 0){
            return res.status(404).json({Message: "No Parent Found"})
        }
        return res.status(200).json(parents)
    } catch (error) {
        return res.status(404).json({message: "no parent found"})
    }
}

export async function getAllBasicIssueDetails(req, res){
    //title, type, priority, assigneenmame

}

export async function getIssueDetailsById(req, res){
    const {issueId} = req.body
    try {
        const [issueResult] =  await db.execute("select * from issue where issue_id = ?", [issueId])
        return res.status(200).json(issueResult)
    } catch (error) {
        return res.status(404).json({message: "issue not found"})
    }
}

export async function editIssueById(req, res){
    // must handle change in parent 
}

export async function deleteIssueById(req, res){
    
}