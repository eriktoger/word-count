use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn create_padded_text(text: &str) -> String {
    let mut hash_map = HashMap::new();
    let words: Vec<&str> = text.split_whitespace().collect();

    let mut max_word = match words.first() {
        Some(word) => word.to_string(),
        None => String::new(),
    };
    let mut max_count = 0;

    for word in words {
        let clean_word = word
            .replace(|c: char| !c.is_alphabetic(), "")
            .to_lowercase();
        if clean_word.is_empty() {
            continue;
        }
        match hash_map.get_mut(&clean_word) {
            Some(count) => {
                *count += 1;
                if *count > max_count {
                    max_count = *count;
                    max_word = clean_word.clone();
                }
            }
            None => {
                hash_map.insert(clean_word.clone(), 1);
            }
        }
    }

    let pad_word_regex_pattern = format!(r"(?i)\b{}\b", max_word);
    let replaced_text = regex::Regex::new(&pad_word_regex_pattern)
        .unwrap()
        .replace_all(text, |captures: &regex::Captures| {
            format!("foo{}bar", &captures[0])
        });

    replaced_text.into_owned()
}
#[cfg(test)]

mod tests {
    use super::*;

    #[test]
    fn test_simple_text_is_padded() {
        let input = "Hello notHello Hello";
        let padded = create_padded_text(input);
        assert_eq!(padded, "fooHellobar notHello fooHellobar");
    }

    #[test]
    fn test_different_casing_is_padded() {
        let input = "DifferentCasing somethingelse diFFerentcasing";
        let padded = create_padded_text(input);
        assert_eq!(
            padded,
            "fooDifferentCasingbar somethingelse foodiFFerentcasingbar"
        );
    }

    #[test]
    fn test_different_white_space_delimiters_is_padded() {
        let input = "hej\thej\nhej hej";
        let padded = create_padded_text(input);
        assert_eq!(padded, "foohejbar\tfoohejbar\nfoohejbar foohejbar");
    }

    #[test]
    fn test_word_can_end_with_punctuation_mark() {
        let input = "hej, hej. hej? hej!";
        let padded = create_padded_text(input);
        assert_eq!(padded, "foohejbar, foohejbar. foohejbar? foohejbar!");
    }

    #[test]
    fn test_ignores_strings_without_letters() {
        let input = "hej ! ! _ _ % %";
        let padded = create_padded_text(input);
        assert_eq!(padded, "foohejbar ! ! _ _ % %");
    }
}
