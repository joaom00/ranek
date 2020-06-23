<?php

function api_user_put($request) {
  $user = wp_get_current_user();
  $user_id = $user->ID;

  if($user_id > 0) {
    $name = sanitize_text_field($request['name']);
    $email = sanitize_email($request['email']);
    $password = ($request['password']);
    $cep = sanitize_text_field($request['cep']);
    $street = sanitize_text_field($request['street']);
    $number = sanitize_text_field($request['number']);
    $neighborhood = sanitize_text_field($request['neighborhood']);
    $city = sanitize_text_field($request['city']);
    $uf = sanitize_text_field($request['uf']);

    $email_exists = email_exists($email);

    if(!$email_exists || $email_exists === $user_id) {

      $response = array(
        'ID' => $user_id,
        'user_email' => $email,
        'user_pass' => $password,
        'display_name' => $name,
        'first_name' => $name,
      );

      wp_update_user($response);

      update_user_meta($user_id, 'cep', $cep);
      update_user_meta($user_id, 'street', $street);
      update_user_meta($user_id, 'number', $number);
      update_user_meta($user_id, 'neighborhood', $neighborhood);
      update_user_meta($user_id, 'city', $city);
      update_user_meta($user_id, 'uf', $uf);

    } else {
      $response = new WP_Error('email', 'Email já cadastrado.', array('status' => 403));
    }
} else {
  $response = new WP_Error('permission', 'Usuário não possui permissão.', array('status' => 401));
}

  return rest_ensure_response($response);
}

function register_api_user_put() {
  register_rest_route('api', '/user', array(
    array(
      'methods' => WP_REST_Server::EDITABLE,
      'callback' => 'api_user_put',
    ),
  ));
}

add_action('rest_api_init', 'register_api_user_put');

?>