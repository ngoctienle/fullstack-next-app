import Text from '~/components/common/Text'

export default function FooterCR() {
  return (
    <div className='bg-black'>
      <div className='container'>
        <div className='flex @992:flex-row flex-col items-center py-5 justify-between'>
          <Text size='xs' className='text-white @992:text-left'>
            ® Độc quyền phân phối sản phẩm tại thị trường Việt Nam GPDKKD số 0203120399, cấp ngày
            01/01/2023, nơi cấp UBND | TP HCM Tòa Nhà HD Tower, 25Bis Nguyễn Thị Minh Khai, Phường
            Bến Nghé, Quận 1, TP.HCM.
          </Text>
          <Text size='xs' className='text-white @992:text-right @992:mt-0 mt-3'>
            Copyright © 2023 Công ty Cổ phần TMDV FSNEcommerce
          </Text>
        </div>
      </div>
    </div>
  )
}
