import { DailyDentalPage } from './app.po';

describe('daily-dental App', () => {
  let page: DailyDentalPage;

  beforeEach(() => {
    page = new DailyDentalPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
