import { AngularLearnPage } from './app.po';

describe('angular-learn App', () => {
  let page: AngularLearnPage;

  beforeEach(() => {
    page = new AngularLearnPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
