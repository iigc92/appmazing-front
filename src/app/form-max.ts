export function onKeyUp(x): void{
  
  if(x.target.value>999){
    x.target.value="999";

  }else if(x.target.value<0){
    x.target.value="0";
  }
}