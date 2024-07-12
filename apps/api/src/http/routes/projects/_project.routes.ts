import { FastifyInstance } from 'fastify'

import { createProject } from './create-project'
import { deleteProject } from './delete-project'
import { getProject } from './get-project'
import { getProjects } from './get-projects'
import { updateProject } from './update-project'

export async function registerProjectsRoutes(app: FastifyInstance) {
  await app.register(createProject)
  await app.register(getProject)
  await app.register(getProjects)
  await app.register(deleteProject)
  await app.register(updateProject)
}
