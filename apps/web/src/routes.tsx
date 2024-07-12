import { Routes as ReactRoutes } from 'react-router-dom'

import { AuthRoutes } from './pages/Auth/auth.routes'
import { CalendarRoutes } from './pages/Calendar/calendar.routes'
import { DashboardRoutes } from './pages/Dashboard/dashboard.routes'
import { FinancialRoutes } from './pages/Financial/financial.routes'
import { HomeRoutes } from './pages/Home/home.routes'
import { PatientRoutes } from './pages/Patient/patient.routes'
import { ProductRoutes } from './pages/Product/product.routes'
import { SettingsRoutes } from './pages/Settings/settings.routes'
import { StockRoutes } from './pages/Stock/stock.routes'

export function Routes(): JSX.Element {
  return (
    <ReactRoutes>
      {[
        ...AuthRoutes(),
        ...PatientRoutes(),
        ...DashboardRoutes(),
        ...StockRoutes(),
        ...ProductRoutes(),
        ...SettingsRoutes(),
        ...FinancialRoutes(),
        ...HomeRoutes(),
        ...CalendarRoutes(),
      ]}
    </ReactRoutes>
  )
}
