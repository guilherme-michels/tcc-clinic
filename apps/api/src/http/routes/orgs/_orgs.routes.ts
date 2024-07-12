import { FastifyInstance } from 'fastify'

import { createOrganization } from './create-organization'
import { getMembership } from './get-membership'
import { getOrganization } from './get-organization'
import { getOrganizations } from './get-organizations'
import { shutdownOrganization } from './shutdown-organization'
import { transferOrganization } from './transfer-organization'
import { updateOrganization } from './update-organization'

export async function registerOrgsRoutes(app: FastifyInstance) {
  await app.register(createOrganization)
  await app.register(getMembership)
  await app.register(getOrganization)
  await app.register(getOrganizations)
  await app.register(updateOrganization)
  await app.register(shutdownOrganization)
  await app.register(transferOrganization)
}
