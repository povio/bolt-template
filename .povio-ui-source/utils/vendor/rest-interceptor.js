class RestInterceptor {
  constructor(applyInterceptor) {
    this.applyInterceptor = applyInterceptor;
    this.interceptorIdMap = [];
  }
  addInterceptor(client, ...args) {
    this.removeInterceptor(client);
    const interceptorId = this.applyInterceptor(client, ...args);
    this.interceptorIdMap.push({ client, interceptorId });
  }
  removeInterceptor(client) {
    const interceptorId = this.interceptorIdMap.find((i) => i.client === client)?.interceptorId;
    if (interceptorId != null) {
      client.interceptors.request.eject(interceptorId);
      this.interceptorIdMap = this.interceptorIdMap.filter((i) => i.client !== client);
    }
  }
}
export {
  RestInterceptor
};
