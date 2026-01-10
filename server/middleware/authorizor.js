//procedure:
/*
1. get personId from req.user
2. get projectId from url
3. get the roleid's from db
4 get perms from db
5. verify the perms
6. add perms and role to req object
*/
export function authorizePermission(requiredPerms){
    return async function(req, res, next){
        
    }
}