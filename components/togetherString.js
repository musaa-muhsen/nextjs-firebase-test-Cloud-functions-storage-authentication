export const togetherString = (value) => {
    let str = value.split(' ').join('');
    str = str + '@generic.com'; 
   setEmail(str)
} 