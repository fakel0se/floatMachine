function machine(msg)
{
	var states = ["S0", "S1", "S2"]; //s0 и s1 - allowable states, s2 - no
	var allowableSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	
	var currentState = states[0];
	var belong = false;
	
	if (msg[0] == '.')
		currentState = states[2];
	
	for (let i = 0; i < msg.length; i++)
	{
		if (currentState == states[2])
			continue;
		if (allowableSymbols.indexOf(msg[i]) == -1)
		{
			currentState = states[2];
			continue;
		}
		if ((msg[i] == ".") && (currentState == states[0]))
		{
			currentState = states[1];
			continue;
		}
		if (msg[i] == ".")
		{
			currentState = states[2];
			continue;
		}		
			
	}
	
	if (currentState != states[2])
		belong = true;
		
	return belong;
	
}