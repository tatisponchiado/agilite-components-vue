export default {
    formatDecimal: (num, minDecimalDigits = 2, maxDecimalDigitis = 2) => {
      return Number(num).toLocaleString(undefined, { minimumFractionDigits: minDecimalDigits, maximumFractionDigits: maxDecimalDigitis })
    },

    formatDate: (d, locale = "pt-BR") => {
        if(!d)return ''
        let options  = {
            timeZone: 'UTC'
        }
        return new Date(d).toLocaleDateString(locale, options)
    },

    formatToIsoDate: (d) => {
        if(!d)return ''
        return new Date(d).toISOString().substr(0, 10)
    },

    formatString: (value, mask) => {
      if (value == null)return null;
      
      let part = ''
      for(let i = 0;i < mask.length - value.length; i++){
        part += '0'
      }
      part += value

      let retorno = ''
      let iValue = part.length -1;
      for(let i = mask.length -1; i >= 0; i--) {
        if(mask.charAt(i) == '#') {
          retorno = part.charAt(iValue) + retorno
          iValue--;
        }else {
          retorno = mask.charAt(i) + retorno
        }
      }
      return retorno.toString();
    }
    
}
