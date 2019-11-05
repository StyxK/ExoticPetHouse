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
                console.log(err)
                return ('การชำระเงินผิดพลาด กรุณาตรวจสอบหรือทำรายการใหม่อีกครั้ง')
            }
            else if (charge){
                console.log(charge,'ชาจ')
                return('การชำระเงินเสร็จสิ้น ของคุณที่ใช้บริการ')
            }
        })
    }

    async balance(){
        return require('omise')({
            'secretKey' : process.env.OMISE_SECRET_KEY,
            'omiseVersion' : '2015-09-10'
        }).balance.retrieve((error,balance)=>{
            if(error){
                return error
            }else if (balance){
                return balance.total
            }
        })
    }

    async test(){
        require('omise')({
            'publicKey' : 'pkey_test_5h6bc0k9vn43x8y9mld',
            'secretKey' : process.env.OMISE_SECRET_KEY,
            'omiseVersion' : '2015-09-10'
        }).tokens.create({
            'card':{
              'name': 'JOHN DOE',
              'city': 'Bangkok',
              'postal_code': 10320,
              'number': '4543756255918867',
              'expiration_month': 2,
              'expiration_year': 2022,
              'security_code': 123
            }
          }, function(error, token) {
                Logger.log(error)
                Logger.log(token)
          });
    }

}
