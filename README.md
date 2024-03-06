#Get Device information from sierra wireless :
Make a GET request to the following URL:
https://octave-api.sierrawireless.io/v5.0/massi/device
'''
    TYPE : GET
    URL : https://octave-api.sierrawireless.io/v5.0/massi/device
    Headers:
        'X-Auth-Token': 'X3HARoodtqsD2S7UOQaUDVxc1uv5ytnV',
        'X-Auth-User': 'massinissa_ahman', 
        'X-Auth-Company': 'massi'

T   
'''

#Get battery real time information from sierra wireless :
In this case we need to use Websocket to get battery information in real time.
   1. First we need a session_id to connect to the websocket.
      Send a POST request to the following URL:
      https://octave-ws.sierrawireless.io/session

      '''
        TYPE : POST
        URL : https://octave-ws.sierrawireless.io/session
        Headers:
            'X-Auth-Token': 'X3HARoodtqsD2S7UOQaUDVxc1uv5ytnV',
            'X-Auth-User': 'massinissa_ahman', 
            'X-Auth-Company': 'massi'
        BODY : EMPTY
     '''
   2. We insert the session_id in the URL to connect to the websocket.
   3. We use the following URL to connect to the websocket:
      Create the websocket with the following URL:
            wss://octave-ws.sierrawireless.io/session/${sessionId}/ws

            webSocket = new WebSocket(`wss://octave-ws.sierrawireless.io/session/${sessionId}/ws`)
    
    4. Connect to the websocket and send a subscribe message to get the battery information.
            
            webSocket.send(JSON.stringify(subscribeMessage))
       
         '''
               const subscribeMessage = {
                    msgId: 'my-request',
                    object: 'event',
                    type: 'subscribe',
                    streamId: 's65e73d5ade69b41fe8d59a13',
                };
         '''
    5. Now we listen for incoming messages from the websocket which will contain the battery information.

#Get environment real time information from sierra wireless :
    We'll do the same thing to get the environment information, we just change the subscribe message to get the environment information.
    '''
        const subscribeMessage = {
            msgId: 'my-request',
            object: 'event',
            type: 'subscribe',
            streamId: '$temperatureStreamId',
        };
    '''
