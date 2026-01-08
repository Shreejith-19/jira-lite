import db from "../config/db.js"
export async function createNewProject(req, res){
    //procedure:
    /**
     1.get the projectname, projectCode(db will check uniqueness and return err)
     2. created id will be added to req object by authenticator
     3. start transaction since we have multiple db statemens
     3. add info to project
     4. add info to project_person_role
     5. if fail roll back and release
     6. if success commit and reslease
     **/
    const {projectName, projectCode, description} = req.body
    const creatorId = req.user.personId
    const conn = await db.getConnection()
    try{
        await conn.beginTransaction()
        const projectResult = await conn.execute("insert into project (project_name, project_code, description, created_by) values(?, ?, ?, ?)", [projectName, projectCode, description, creatorId])
        const projectId = projectResult[0].insertId
        await conn.execute("insert into project_person_role (project_id, person_id, role_id) values(?, ?, ?)", [projectId, creatorId, 1])//1 - OWNER
        await conn.execute("insert into project_person_role (project_id, person_id, role_id) values(?, ?, ?)", [projectId, creatorId, 2])//2 - ADMIN
        await conn.commit()
    }catch(error){
        await conn.rollback()
        if(error.code === "ER_DUP_ENTRY"){
            return res.status(409).json({errorMessage: "Project code exists"})
        }
        return res.status(500).json({errorMessage: "Server Error"})
    }finally{
        conn.release()
    }

}