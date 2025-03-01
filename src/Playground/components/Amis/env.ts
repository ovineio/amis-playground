export const env = {
  session: 'appComponent',
  fetcher: async (config: any) => {
    if (config.dataProvider) {
      const source = await config.dataProvider(config)
      return source
    }
  },
}
