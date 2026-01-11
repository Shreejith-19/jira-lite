import express from 'express'
import { createNewProject } from '../controllers/projects.js'
import { createNewIssue, deleteIssueById, editIssueById, getAllBasicIssueDetails, getIssueDetailsById } from '../controllers/issues.js'
import { showAllIssuesByTypeInProject, showAllMembersInProject } from '../controllers/summary.js'
const router = express.Router()

router.route('/new')
    .post(createNewProject)//done

router.route("/:projectId/boards")
    .get(getAllBasicIssueDetails)

router.route('/:projectId/summary/members')
    .get(showAllMembersInProject)//done

router.route('/:projectId/summary/issues/:issueType')
    .get(showAllIssuesByTypeInProject)//done

router.route('/:projectId/issues/:issueId')
    .get(getIssueDetailsById)
    .patch(editIssueById)
    .delete(deleteIssueById)

router.route('/:projectId/issues/new')
    .post(createNewIssue)//done

export default router