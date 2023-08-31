export default (dataType: Device) => {
  const keyName = dataType.keyName
  switch (keyName) {
    case 'pf':
    case 'acp_pf':
    case 'mp_pf':
      return { min: 0, max: 2.0 }
    case 'va':
      return { min: 800, max: 1500 }
    case 'kwh':
    case 'acp_kwh':
    case 'mp_kwh':
      return { min: 1.0, max: 5.0 }
    case 'kw':
    case 'acp_kw':
    case 'mp_kw':
      return { min: 0.05, max: 0.2 }
    case 'a':
    case 'acp_ia':
    case 'acp_ib':
    case 'acp_ic':
    case 'mp_ia':
    case 'mp_ib':
    case 'mp_ic':
    case 'mp_i':
      return { min: 3, max: 8 }
    case 'v':
    case 'acp_va':
    case 'acp_vb':
    case 'acp_vc':
    case 'mp_va':
    case 'mp_vb':
    case 'mp_vc':
      return { min: 190, max: 280 }
    case 'outlets_on':
      return { min: 0, max: 1 }
    case 'fup_temp':
    case 'pdu_1_up_c_temperature':
    case 'pdu_2_up_c_temperature':
      return { min: 20, max: 120 }
    case 'fdn_temp':
    case 'pdu_1_down_c_temperature':
    case 'pdu_2_down_c_temperature':
      return { min: 20, max: 120 }
    case 'fmd_temp':
    case 'pdu_1_middle_c_temperature':
    case 'pdu_2_middle_c_temperature':
      return { min: 20, max: 120 }
    case 'bup_temp':
    case 'pdu_1_up_h_temperature':
    case 'pdu_2_up_h_temperature':
      return { min: 20, max: 120 }
    case 'bdn_temp':
    case 'pdu_1_down_h_temperature':
    case 'pdu_2_down_h_temperature':
      return { min: 20, max: 120 }
    case 'bmd_temp':
    case 'pdu_1_middle_h_temperature':
    case 'pdu_2_middle_h_temperature':
      return { min: 20, max: 120 }
    case 'wf':
      return { min: 0, max: 60 }
    case 'tube_temp':
      return { min: 5, max: 100 }
    case 'alarm_on':
      return { min: 0, max: 1 }
    case 'kpa':
      return { min: 80, max: 150 }
    case 'inner_temp':
      return { min: 10, max: 80 }
    case 'rh':
      return { min: 0, max: 100 }
    case 'auto_manual':
      return { min: 0, max: 1 }
    case 'error_on':
      return { min: 0, max: 1 }
    case 'run_stop':
      return { min: 0, max: 1 }
    case 'status':
      return { min: 0, max: 1 }
    case 'valve_m':
      return { min: 0, max: 1 }
    default:
      return { min: 0, max: 2000 }
  }
}
