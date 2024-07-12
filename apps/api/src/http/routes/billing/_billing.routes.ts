import { FastifyInstance } from 'fastify'

import { getOrganizationBilling } from './get-organization-billing'

export async function registerBillingRoutes(app: FastifyInstance) {
  await app.register(getOrganizationBilling)
}
