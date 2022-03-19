import addressJson from "../assets/address.json";
import { AddressModel } from "../modules/address/address.model";
async function run() {
  // step 1: load data from address.json

  // step 2: tranform data to address document
  const addressDocuments: any = [];
  addressJson.forEach((province) => {
    addressDocuments.push({
      provinceId: province.pid,
      province: province.pn,
    });
    province.ds.forEach((district) => {
      addressDocuments.push({
        provinceId: province.pid,
        province: province.pn,
        districtId: district.did,
        district: district.dn,
      });
      district.ws.forEach((ward) => {
        addressDocuments.push({
          provinceId: province.pid,
          province: province.pn,
          districtId: district.did,
          district: district.dn,
          wardId: ward.wid,
          ward: ward.wn,
        });
      });
    });
  });
  console.log("address", addressDocuments.length);
  await AddressModel.insertMany(addressDocuments);
  console.log("insert done");
}

run();
