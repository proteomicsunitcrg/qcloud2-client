import { StatisticsRouterModule } from './statistics-router.module';

describe('StatisticsRouterModule', () => {
  let statisticsRouterModule: StatisticsRouterModule;

  beforeEach(() => {
    statisticsRouterModule = new StatisticsRouterModule();
  });

  it('should create an instance', () => {
    expect(statisticsRouterModule).toBeTruthy();
  });
});
