//procedure:
/*
1. get personId from req.user
2. get projectId from url
3. get the roleid's from db
4 get perms from db
5. verify the perms
6. add perms and role to req object
*/
import db from '../config/db.js'

export function authorizePermission(requiredPerm){
    return async function(req, res, next){
        const personId = req.user.personId
        const projectId = req.params.projectId
        try {
            const [roleResult] = await db.execute("select role_id from project_person_role where project_id = ? and person_id = ?", [projectId, personId])
            const roleId = roleResult[0].role_id

            const [permResult] = await db.execute("select p.perm_code from permission p join role_permission rp on p.perm_id = rp.perm_id where role_id = ?",[roleId])
            const permCodes = permResult.map(item => {return item.perm_code})
            const isAllowed = requiredPerm.every(perm => permCodes.includes(perm))
            if(!isAllowed){
                return res.status(403).json({Message: "Operation not allowed"})
            }
            req.projectRole = roleId
            req.projectPermissions = permCodes
            next()
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({errorMessage: "Operation not allowed"})
        }        
    }
}       