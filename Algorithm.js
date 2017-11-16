function machine(msg)
{
	var states = 
	{
		values: ["S0", "S1", "S2"], //s0 и s1 - allowable states, s2 - no,
		getState: function(idx) {
			return this.values[idx];
		},
		isAvailable: function(state) {
			if (state == this.values[2])
				return false;
			return true;			
		}
	};
	
	var symbols = 
	{
		values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
		getSymb: function(idx) {
			return this.values[idx];
		}		
	}
	
	var transitions =
	{		
		getTransition: function(state, symb){
			if (msg[0] == '.')
				return states.getState(2);
			
			if (state == states.getState(2))
				return states.getState(2);
			
			if (symbols.values.indexOf(symb) == -1)
			{
				return states.getState(2);
			}
			if ((symb == ".") && (state == states.getState(0)))
			{
				return states.getState(1);
			}
			if (symb == ".")
			{
				return states.getState(2);
			}
			
			if (state == states.getState(0))
			{
				return states.getState(0);
			}
			
			return states.getState(1);
				
			
		}
	}	
	
	//var states = ["S0", "S1", "S2"]; //s0 и s1 - allowable states, s2 - no
	//var allowableSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	
	var currentState = states.getState(0);
	var belong = false;
	
	//if (msg[0] == '.')
	//	currentState = states[2];
	
	for (let i = 0; i < msg.length; i++)
	{
		currentState = transitions.getTransition(currentState, msg[i]);
		/*if (currentState == states[2])
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
		}			*/
	}
	
	if (states.isAvailable(currentState))
		belong = true;
		
	return belong;	
}