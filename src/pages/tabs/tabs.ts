import { Component } from '@angular/core';

import { AuctionPage } from '../auction/auction';
import { HelpPage } from '../help/help';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AuctionPage;
  tab3Root = HelpPage;

  constructor() {

  }
}
