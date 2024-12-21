import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";

actor MoneyManager {
    private stable var transactionEntries : [(Principal, [Transaction])] = [];
    private var transactions = HashMap.HashMap<Principal, [Transaction]>(1, Principal.equal, Principal.hash);

    type Transaction = {
        id: Nat;
        amount: Nat;
        description: Text;
        category: Text;
        timestamp: Int;
        transactionType: Text; // "income" or "expense"
    };

    public shared(msg) func addTransaction(amount: Nat, description: Text, category: Text, transactionType: Text) : async Nat {
        let caller = msg.caller;
        let timestamp = Time.now();
        
        let transaction : Transaction = {
            id = generateTransactionId();
            amount = amount;
            description = description;
            category = category;
            timestamp = timestamp;
            transactionType = transactionType;
        };

        switch (transactions.get(caller)) {
            case null {
                transactions.put(caller, [transaction]);
            };
            case (?userTransactions) {
                transactions.put(caller, Array.append(userTransactions, [transaction]));
            };
        };

        return transaction.id;
    };

    public shared(msg) func getTransactions() : async [Transaction] {
        let caller = msg.caller;
        switch (transactions.get(caller)) {
            case null { [] };
            case (?userTransactions) { userTransactions };
        };
    };

    private func generateTransactionId() : Nat {
        // Simple implementation - in production, you'd want a more sophisticated ID generation
        let timestamp = Int.abs(Time.now());
        return timestamp;
    };

    system func preupgrade() {
        transactionEntries := Iter.toArray(transactions.entries());
    };

    system func postupgrade() {
        transactions := HashMap.fromIter<Principal, [Transaction]>(transactionEntries.vals(), 1, Principal.equal, Principal.hash);
    };
}