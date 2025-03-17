export interface Job {
  JobName: string
  ProviderName: string
  Proxy: string
  Pool: string
  Type: string
  Status: string
  Threads: number
  URL: string
  LastHeartbeat: string
}

export interface ProxyRequest {
  ProviderName: string
  IP: string
  TimeTaken: number
  StatusCode: number
  RequestTime: string
  EventTime: string
  ContinentCode: string
  ContinentName: string
  CountryISOCode: string
  CountryName: string
  CityName: string
  Success: number
  Type: string
  Pool: string
  ErrorMessage: string
  Latitude: number
  Longitude: number
  AccuracyRadius: number
  TimeZone: string
  PostalCode: string
}

export interface JobHeartbeat {
  HeartbeatID: string
  JobName: string
  Status: string
  Timestamp: string
  Message: string
}

