// routesConfig.js
import CompanyUtility from '../Components/Company/CreateCompany/CompanyUtility';
import CreateCompany from "../Components/Company/CreateCompany/CreateCompany";
import SelectCompany from './Company/CreateCompany/SelectCompany';
import CreateAccountYearData from './Company/AccountingYear/CreateAccountingYear';
import SelectAccoungYear from './Company/AccountingYear/SelectAccountingYear';
import FinicialGroupsUtility from "./Master/AccountInformation/FinicialMasters/FinicialMasterUtility"
import FinicialMaster from "./Master/AccountInformation/FinicialMasters/FinicialMaster"
import GstStateMasterUtility from "./Master//OtherMasters/GSTStateMaster/GstStateMasterUtility"
import GstStateMaster from "./Master/OtherMasters/GSTStateMaster/GstStateMaster"
import CityMasterUtility from "./Master/AccountInformation/CityMaster/CityMasterUtility";
import CityMaster from "./Master/AccountInformation/CityMaster/CityMaster"
import BrandMasterUtility from "./Master/OtherMasters/BrandMaster/BrandMasterUtility";
import BrandMaster from "./Master/OtherMasters/BrandMaster/BrandMaster"
import GSTRateMasterUtility from "./Master/OtherMasters/GSTRateMaster/GSTRateMasterUtility"
import GSTRateMaster from './Master/OtherMasters/GSTRateMaster/GSTRateMaster';
import OtherPurchase from './Transactions/OtherPurchase/OtherPurchase';
import DeliveryOrderUtility from './BusinessRelated/DeliveryOrder/DeliveryOrderUtility';
import DeliveryOrder from './BusinessRelated/DeliveryOrder/DeliveryOrder';

const routes = [
  {
    path: '/create-utility',
    element: CompanyUtility
  },
  {
    path: '/create-company',
    element: CreateCompany
  },
  {
    path: '/select-company',
    element: SelectCompany
  },
  {
    path: '/create-accounting-year',
    element: CreateAccountYearData
  },
  {
    path: '/select-accounting-year',
    element: SelectAccoungYear
  },
  {
    path: '/financial-groups-utility',
    element: FinicialGroupsUtility
  },
  {
    path: '/financial-groups',
    element: FinicialMaster
  },
  //GST StateMaster Routes
  {
    path: '/gst-state-master-utility',
    element: GstStateMasterUtility
  },
  {
    path: '/gst-state-master',
    element: GstStateMaster
  },
  {
    path: '/city-master-utility',
    element: CityMasterUtility
  },
  {
    path: '/city-master',
    element: CityMaster
  },
  {
    path: '/brand-master-utility',
    element: BrandMasterUtility
  },
  {
    path: '/brand-master',
    element: BrandMaster
  },
  {
    path: '/gst-rate-masterutility',
    element: GSTRateMasterUtility
  },
  {
    path: '/gst-ratemaster',
    element: GSTRateMaster
  },
  {
    path: '/other-purchase',
    element: OtherPurchase
  },
{
  path: '/delivery-order-utility',
  element: DeliveryOrderUtility
},
{
  path: '/delivery-order',
  element: DeliveryOrder
}

 


  
];

export default routes;
