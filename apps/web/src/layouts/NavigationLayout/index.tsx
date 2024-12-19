import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { BottomBar } from './components/BottomBar'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  let itemsLeftbar = []

  let itemsUser = []

  let itemsTopbar = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/streamer/dashboard',
      label: 'Dashboard',
      onClick: () => goTo('/streamer/dashboard'),
    },

    {
      key: '/streamer/dashboard/live',
      label: 'Live Feed',
      onClick: () => goTo('/streamer/dashboard/live'),
    },
  ]

  let itemsSubNavigation = [
    {
      key: '/home',
      label: 'Home',
    },

    {
      key: '/events/:eventId/streamers/:streamerId',
      label: 'User Stream',
    },

    {
      key: '/streamer/dashboard',
      label: 'Streamer Dashboard',
    },

    {
      key: '/streamer/dashboard/live',
      label: 'Streamer Live Feed',
    },
  ]

  let itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar =
    (itemsLeftbar.length > 0 || itemsUser.length > 0) &&
    !isMobile &&
    authentication.isLoggedIn

  if (!authentication.isLoggedIn) {
    itemsLeftbar = []
    itemsUser = []
    itemsTopbar = []
    itemsSubNavigation = []
    itemsMobile = []
  }

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              isLoggedIn={authentication.isLoggedIn}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {children}
            <BottomBar style={{ marginTop: 'auto', width: '100%', zIndex: 1 }} />
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
