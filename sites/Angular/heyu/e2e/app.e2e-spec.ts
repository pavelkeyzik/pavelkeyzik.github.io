import { HeyuPage } from './app.po';

describe('heyu App', () => {
  let page: HeyuPage;

  beforeEach(() => {
    page = new HeyuPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
