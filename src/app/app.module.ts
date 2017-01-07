
import { NgModule, ErrorHandler } from '@angular/core'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'
import { SignUpPage } from '../pages/signup/signup'
import { LoginPage } from '../pages/login/login'
import { AboutPage } from '../pages/about/about'
import { ContactPage } from '../pages/contact/contact'
import { HomePage } from '../pages/home/home'
import { TabsPage } from '../pages/tabs/tabs'
import { BestmatchPage } from '../pages/bestmatch/bestmatch'
import { SearchmorePage } from '../pages/searchmore/searchmore'
import { SelectservicePage } from '../pages/selectservice/selectservice'
import { NailtechdashboardPage} from '../pages/nailtechdashboard/nailtechdashboard'
import { AvailabilityPage} from '../pages/availability/availability'
import { ProfilePage} from '../pages/profile/profile'
import { Ionic2RatingModule } from 'ionic2-rating'
import { Bookartist } from '../providers/bookartist'
import { Auth } from '../providers/auth.ts'
import { ModalContentPage  } from '../profile/modal'
import { PaymentPage  } from '../pages/payment/payment'
import { NailartistpagePage } from '../pages/nailartistpage/nailartistpage';
import { ProfilePicsRevs } from '../providers/profile-pics-revs';
import { Apptcal } from '../providers/apptcal'
import { ReviewPage } from '../pages/review/review';
import { ChartModule } from 'angular2-chartjs';
import { Addreview } from '../providers/addreview';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SignUpPage,
    LoginPage,
    ContactPage,
    HomePage,
    TabsPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage,
    ProfilePage,
    NailartistpagePage,
    PaymentPage,
    ReviewPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    ChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SignUpPage,
    LoginPage,
    ContactPage,
    HomePage,
    TabsPage,
    BestmatchPage,
    SearchmorePage,
    SelectservicePage,
    NailtechdashboardPage,
    AvailabilityPage,
    ProfilePage,
    PaymentPage,
    NailartistpagePage,
    ReviewPage
  ],
providers: [Bookartist, ProfilePicsRevs, Apptcal, Addreview, {provide: ErrorHandler, useClass: IonicErrorHandler}, Auth]
})
export class AppModule {}
