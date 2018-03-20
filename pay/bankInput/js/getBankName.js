/**
 * Created by Administrator on 2017/6/28 0028.
 */
// 根据银行卡号获取发卡行名称
 getBankName = function (bankCard) {
     var bankName = bankCard.bank;
     if (bankCard.vale == null || bankCard.vale == "") { return ""; }
     $.getJSON("js/bankData.json", {}, function (data) {
         var bankBin = 0;
         var isFind = false;
         for (var key = 12; key >= 2; key--) {
             bankBin = bankCard.vale.substring(0, key);
             $.each(data, function (i, item) {
                 if (item.bin == bankBin) {
                     console.log(item.bin);
                     isFind = true;
                     console.log(item.bankName);
                     //return item.bankName;
                 }
             });
             if (isFind) {
                 break;
             }
         }
         if (!isFind) { return "未知发卡银行"; } });
 };