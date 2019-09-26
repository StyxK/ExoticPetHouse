import { Injectable, Logger } from '@nestjs/common';
import { ChargeDTO } from './charge.dto';

@Injectable()
export class ChargeService {

    async chargeFromToken(data:Partial<ChargeDTO>){
        require('omise')({
            'secretKey' : process.env.OMISE_SECRET_KEY,
            'omiseVersion' : '2015-09-10'
        }).charges.create({
            'amount' : `${data.amount*100}`,
            'currency' : 'thb',
            'card' : data.token
        },(err,charge)=>{
            if(err){
                throw new Error('การชำระเงินผิดพลาด กรุณาตรวจสอบหรือทำรายการใหม่อีกครั้ง')
            }
            else if (charge){
                return('การชำระเงินเสร็จสิ้น ของคุณที่ใช้บริการ')
            }
        })
    }

    

}
