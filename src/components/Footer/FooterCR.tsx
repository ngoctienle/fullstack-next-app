import { Text } from '@/components/ui/text'

export default function FooterCR() {
  return (
    <div className='bg-black'>
      <div className='container'>
        <div className='flex flex-col items-center justify-between py-3 @768:py-5 @992:flex-row'>
          <Text size='smf' className='text-white @992:text-left'>
            ® Độc quyền phân phối sản phẩm tại thị trường Việt Nam GPDKKD số 0203120399, cấp ngày
            01/01/2023, nơi cấp UBND | TP HCM Tòa Nhà HD Tower, 25Bis Nguyễn Thị Minh Khai, Phường
            Bến Nghé, Quận 1, TP.HCM.
          </Text>
          <Text size='smf' className='mt-3 text-white @992:mt-0 @992:text-right'>
            Copyright © 2023 Công ty Cổ phần TMDV FSNEcommerce
          </Text>
        </div>
      </div>
    </div>
  )
}
