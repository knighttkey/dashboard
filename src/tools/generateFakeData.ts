import { faker } from '@faker-js/faker'
import roundTo from './roundTo'
export default (dataType: Device, labelList: string[]) => {
  const keyName = dataType.keyName
  switch (keyName) {
    case 'pf':
    case 'acp_pf':
    case 'mp_pf':
      //正常為1
      return labelList
        .map(() => faker.number.float({ min: 0.8, max: 1.2 }))
        .map((i) => {
          return roundTo(i, 2)
        })
    case 'va':
      //視在功率 若電流3安培、電壓 110，VA為330  A(1-5) V(100-240)
      return labelList.map(() => faker.number.int({ min: 1000, max: 1200 }))
    case 'kwh':
    case 'acp_kwh':
    case 'mp_kwh':
      return labelList
        .map(() => faker.number.float({ min: 2, max: 4 }))
        .map((i) => {
          return roundTo(i, 2)
        })
    case 'kw':
    case 'acp_kw':
    case 'mp_kw':
      return labelList
        .map(() => faker.number.float({ min: 0.08, max: 0.15 }))
        .map((i) => {
          return roundTo(i, 2)
        })
    case 'a':
    case 'acp_ia':
    case 'acp_ib':
    case 'acp_ic':
    case 'mp_ia':
    case 'mp_ib':
    case 'mp_ic':
    case 'mp_i':
      return labelList.map(() => faker.number.int({ min: 4.5, max: 6.5 }))
    case 'v':
    case 'acp_va':
    case 'acp_vb':
    case 'acp_vc':
    case 'mp_va':
    case 'mp_vb':
    case 'mp_vc':
      return labelList.map(() => faker.number.int({ min: 200, max: 250 }))
    case 'outlets_on':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    case 'fup_temp':
    case 'pdu_1_up_c_temperature':
    case 'pdu_2_up_c_temperature':
      return labelList.map(() => faker.number.int({ min: 40, max: 95 }))
    case 'fdn_temp':
    case 'pdu_1_down_c_temperature':
    case 'pdu_2_down_c_temperature':
      return labelList.map(() => faker.number.int({ min: 40, max: 95 }))
    case 'fmd_temp':
    case 'pdu_1_middle_c_temperature':
    case 'pdu_2_middle_c_temperature':
      return labelList.map(() => faker.number.int({ min: 40, max: 95 }))
    case 'bup_temp':
    case 'pdu_1_up_h_temperature':
    case 'pdu_2_up_h_temperature':
      return labelList.map(() => faker.number.int({ min: 40, max: 95 }))
    case 'bdn_temp':
    case 'pdu_1_down_h_temperature':
    case 'pdu_2_down_h_temperature':
      return labelList.map(() => faker.number.int({ min: 40, max: 95 }))
    case 'bmd_temp':
    case 'pdu_1_middle_h_temperature':
    case 'pdu_2_middle_h_temperature':
      return labelList.map(() => faker.number.int({ min: 40, max: 95 }))
    case 'wf':
      return labelList.map(() => faker.number.int({ min: 20, max: 40 }))
    case 'tube_temp':
      return labelList.map(() => faker.number.int({ min: 20, max: 70 }))
    case 'alarm_on':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    case 'kpa':
      return labelList.map(() => faker.number.int({ min: 90, max: 120 }))
    case 'inner_temp':
      return labelList.map(() => faker.number.int({ min: 24, max: 36 }))
    case 'rh':
      return labelList.map(() => faker.number.int({ min: 40, max: 90 }))
    case 'auto_manual':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    case 'error_on':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    case 'run_stop':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    case 'status':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    case 'valve_m':
      return labelList.map(() => faker.number.int({ min: 0, max: 1 }))
    default:
      return labelList.map(() => faker.number.int({ min: 0, max: 100 }))
  }
}
