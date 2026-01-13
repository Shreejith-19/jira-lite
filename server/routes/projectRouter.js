import express from 'express'
import { createNewProject } from '../controllers/projects.js'
import { createNewIssue, deleteIssueById, editIssueById, getAllBasicIssueDetails, getIssueDetailsById } from '../controllers/issues.js'
import {showAllMembersInProject } from '../controllers/summary.js'
import { showAllParentIssues } from '../controllers/issues.js'
import { authorizePermission } from '../middleware/authorizor.js'
const router = express.Router()

router.route('/new')
    .post(createNewProject)//done

router.route("/:projectId/boards")
    .get(getAllBasicIssueDetails)

router.route('/:projectId/summary/members')
    .get(authorizePermission(["PROJECT_DELETE","Proj"]), showAllMembersInProject)//done

router.route('/:projectId/issues/child')// frontend reqs to /:projectId/issues/child?childType=
    .get(showAllParentIssues) //partially done - testing

router.route('/:projectId/issues/:issueId')
    .get(getIssueDetailsById)
    .patch(editIssueById)
    .delete(deleteIssueById)

router.route('/:projectId/issues/new')
    .post(createNewIssue)//done

export default router