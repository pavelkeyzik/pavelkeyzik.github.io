import { SimpleChatPage } from './app.po';

describe('simple-chat App', () => {
  let page: SimpleChatPage;

  beforeEach(() => {
    page = new SimpleChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
