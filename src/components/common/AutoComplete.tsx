import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type ItemType = {
  id: number;
  name: string;
};

type AutocompleteProps = {
  data: ItemType[];
  onSelect: (item: ItemType) => void;
  placeholder?: string;
  debounceTime?: number; // ms, default 300
  isShowSelect:boolean;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  data,
  onSelect,
  placeholder = 'Type to search...',
  debounceTime = 300,
  isShowSelect = true
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showList, setShowList] = useState(false);
    const [item,setItem] = useState<ItemType|null>(null)
  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceTime]);

  // Filter data based on debouncedQuery
  const filteredData = useMemo(() => {
    if (debouncedQuery.length === 0) return [];
    const lowerQuery = debouncedQuery.toLowerCase();
    return data.filter(item => item.name.toLowerCase().includes(lowerQuery));
  }, [debouncedQuery, data]);

    const handleSelect = (item: ItemType) => {
        setShowList(false);
        onSelect(item);
        if (!isShowSelect) {
            // Nếu không cho phép chọn, reset luôn
            setItem(null);
            setQuery('');
            return;
        }
        // Nếu cho phép chọn item
        setQuery(item.name);
        setItem(item);
    };

  const onClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setShowList(false);
    setItem(null)
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={text => {
            setQuery(text);
            setShowList(true);
          }}
          onFocus={() => setShowList(true)}
        />
        {item && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {showList && filteredData.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSelect(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 250,
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  clearButton: {
    paddingHorizontal: 8,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#888',
  },
  list: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderTopWidth: 0,
    maxHeight: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 42,
    width: '100%',
    zIndex: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
