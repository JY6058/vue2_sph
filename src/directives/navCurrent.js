export default {
  componentUpdated(el,binding){
    let ops = binding.value
    let data = el.getElementsByClassName('addClass')
    if(data&&data.length>0){
      if(binding.oldValue.index!==-1){
        data[binding.oldValue.index].className = ops.className
      }
      if(ops.index!==-1){
        data[ops.index].className += ` ${ops.activeClass}`
      }
    }
  }
}