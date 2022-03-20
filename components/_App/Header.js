import { Menu, Container, Image, Icon,  Responsive, Dropdown, DropdownMenu } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { handleLogout } from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
  const router = useRouter()

  function isActive(route) {
    return route == router.pathname;
  }

  return (
    <Menu fluid stackable id="menu" inverted>
      <Container>

        <Link href="/photos">
          <Menu.Item header position='left'>
            <Icon
              name="picture"
              size="large"
            />
            My Photo Gallery
          </Menu.Item>
        </Link>

        {user ?
          (<>

            <Link href="/photos">
              <Menu.Item header active={isActive('/photos')}>
                <Icon
                  name="photo"
                  size="large"
                />
                Photos
              </Menu.Item>
            </Link>

            <Link href="/albums">
              <Menu.Item header active={isActive('/albums')}>
                <Icon
                  name="folder"
                  size="large"
                />
                Albums
              </Menu.Item>
            </Link>


            <Menu.Item onClick={handleLogout} header position='right' >
              <Icon
                name="sign out"
                size="large"
              />
              Logout
            </Menu.Item>
          </>)
          :
          (<>
            {isActive('/signup') ?

              <Link href="/login">
                <Menu.Item header position='right' active={isActive('/login')}>
                  <Icon
                    name="sign in"
                    size="large"
                  />
                  Login
                </Menu.Item>
              </Link>
              :
              <Link href="/signup">
                <Menu.Item header position='right' active={isActive('/signup')}>
                  <Icon
                    name="signup"
                    size="large"
                  />
                  Signup
                </Menu.Item>
              </Link>
            }
          </>)

        }

      </Container>
    </Menu>
  )
}

export default Header;
