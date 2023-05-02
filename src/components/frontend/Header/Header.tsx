import HeaderAds from './HeaderAds'
import HeaderMain from './HeaderMain'
import HeaderTop from './HeaderTop'

export default function Header() {
  return (
    <div id='page-header' className='shadow-shadow2'>
      <HeaderAds />
      <HeaderTop />
      <HeaderMain />
    </div>
  )
}
