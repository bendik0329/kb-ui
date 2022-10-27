export function filterAddress(address) {
    let message = ''
    if(!address.street_number){
        message = 'err','Please enter street number!!'
    }
    if(!address.route){
        message = 'Please enter route!!'
    }
    if(!address.subpremise){
        message = ('err','Please enter subpremise!!')
    }
    if(!address.locality){
        message = 'Please enter locality!!'
    }
    if(!address.administrative_area_level_1){
        message = 'Please enter administrative area!!'
    }
    if(!address.postal_code){
        message = 'Please enter postal code!!'
    }
    const addressString = address.street_number+' '+address.route+' '+address.subpremise+', '+address.locality+', '+address.administrative_area_level_1+' '+address.postal_code
    return { addressString , message}
}